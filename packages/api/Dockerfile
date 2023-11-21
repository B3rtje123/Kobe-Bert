###################
# BUILD FOR LOCAL DEVELOPMENT
###################

# Base image
FROM node:18 as development

# Create app directory
WORKDIR /usr/src/app

# copy package.json and package-lock.json
COPY --chown=node:node package*.json ./

# copy packege.json and package-lock.json from packages/api to own dir
COPY --chown=node:node packages/api/package*.json ./packages/api/

# install both development and production dependencies
RUN npm ci

# Bundle app source
COPY --chown=node:node packages/api ./packages/api

USER node


###################
# BUILD FOR PRODUCTION
###################
FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node packages/api packages/api

RUN npm run build -w api

ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

USER node


###################
# PRODUCTION
###################

FROM node:18-alpine As production

WORKDIR /usr/src/app

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/packages/api/dist ./packages/api/dist

# Start the server using the production build
CMD [ "node", "packages/api/dist/main.js" ]


