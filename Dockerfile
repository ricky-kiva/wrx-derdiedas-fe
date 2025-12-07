FROM node:22-alpine AS deps
WORKDIR /usr/src/app
USER root
COPY package*.json ./
RUN npm ci
COPY . .

FROM deps AS build
ARG VITE_GOOGLE_CLIENT_ID
ENV VITE_GOOGLE_CLIENT_ID=${VITE_GOOGLE_CLIENT_ID}
ARG VITE_NODE_ENV
ENV VITE_NODE_ENV=${VITE_NODE_ENV}
RUN npm run build

FROM nginx:alpine AS runtime
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /usr/src/app/dist ./
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
