# build image dựa trên image của node
FROM node:18-alpine

# tạo một directory bên trong image để chứa source của ứng dụng
WORKDIR /app

# copy toàn bộ code của ứng dụng vào bên trong working directory (folder app)
COPY . .


# thực thi 1 câu lệnh bên trong working directory
RUN npm install

#cho phép quyền thực thi file
RUN chmod +x wait-for

#
EXPOSE 4000

#
CMD ["node", "src/index.js"]