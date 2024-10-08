# Use Cypress included image
FROM cypress/included:12.5.1

# Set working directory to /e2e in the container
WORKDIR /e2e

# Copy all files from the current directory into /e2e in the container
COPY . .

# Install npm dependencies
RUN npm install

# Run Cypress 
CMD ["npx", "cypress", "run"]

