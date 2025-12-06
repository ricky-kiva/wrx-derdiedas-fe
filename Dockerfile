FROM node:22-alpine AS deps
WORKDIR /usr/src/app
USER root
COPY --chown=node:node . .
RUN npm ci

FROM deps AS build
ARG VITE_GOOGLE_CLIENT_ID
ENV VITE_GOOGLE_CLIENT_ID=${VITE_GOOGLE_CLIENT_ID}
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev
COPY --from=build /usr/src/app/dist ./dist
RUN npm install -g serve
USER node
CMD ["serve", "dist"]
