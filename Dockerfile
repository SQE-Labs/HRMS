FROM cypress/included:12.11.0
RUN npm install -g n \
    && n 20.11.0 \
    && node -v
WORKDIR /e2e
COPY package.json /e2e
COPY . .

RUN npm install

CMD ["npm", "run"] 