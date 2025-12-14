FROM node:22-alpine AS deps
WORKDIR /usr/src/app
USER root
COPY package*.json ./
RUN npm ci
COPY . .

FROM deps AS build
RUN npm run build

# FROM nginx:alpine AS runtime
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=build /usr/src/app/dist ./
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY public/env ./env
# COPY scripts/docker/env/replace-runtime-config.sh /docker-entrypoint.sh
# RUN chmod +x /docker-entrypoint.sh
# EXPOSE 80
# ENTRYPOINT [ "/docker-entrypoint.sh" ]
# CMD ["nginx", "-g", "daemon off;"]

# --- Temporary runtime using 'serve' for troubleshooting ---
FROM node:22-alpine AS runtime
WORKDIR /usr/src/app
RUN npm install -g serve
COPY --from=build /usr/src/app/dist ./
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]