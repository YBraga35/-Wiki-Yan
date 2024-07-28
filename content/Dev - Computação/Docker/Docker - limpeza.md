# Parar e remover containers
sudo docker-compose down
## ou
sudo docker container stop <container_id>
sudo docker container rm <container_id>

# Remover imagens
sudo docker rmi 5etools-image
## Listar imagens e remover
sudo docker images
sudo docker rmi <image_id>

# Remover volumes
sudo docker volume prune

# Remover redes
sudo docker network prune

# Remover pasta local
rm -rf ~/5etools

# Verificar espaço
sudo docker system df
# Limpar ainda mais espaço
sudo docker system prune
