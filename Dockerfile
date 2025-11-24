# Base image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all project files
COPY . .

# Expose bot port (if using web dashboard)
EXPOSE 3000

# Start bot
CMD ["npm", "start"]
