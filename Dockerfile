FROM node:22.20.0
# -p /home/app is safer because it creates the whole path, including any missing parent directories.
RUN mkdir -p /home/app
WORKDIR /home/app
# Copy CWD to CWD in container
COPY . .
RUN npm install
# Expose our app's port (use the port we need)
EXPOSE 8000
CMD ["node", "index.js"]