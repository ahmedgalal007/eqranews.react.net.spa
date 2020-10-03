#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443


#Ahmed Galal -Install nodejs
#RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g gulp-cli


#ENV MYSQL_VERSION=8.0
#RUN apt-get update && apt-get install -y apt-transport-https 
#RUN apt-get install -y lsb-release apt-transport-https ca-certificates wget gnupg
#RUN wget -O mysql-apt-config.deb https://dev.mysql.com/get/mysql-apt-config_0.8.13-1_all.deb
#RUN dpkg -i mysql-apt-config.deb
#RUN apt-get install -y mysql-apt-config
#RUN echo "apt-get install -y mysql-shell --version 8.0 --mysqlversion 8.0  --mysqlhost 127.0.0.1 --mysqlport 3306 --mysqluser root --mysqlpassword Sico007_" 

# install mysql-client
# apt-get install -y default-mysql-client

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["eqranews.react.net.spa/eqranews.react.net.spa.csproj", "eqranews.react.net.spa/"]
COPY ["DAL/DAL.csproj", "DAL/"]
COPY ["eqranews.geo/eqranews.geo.csproj", "eqranews.geo/"]
COPY ["eqranews.crawling/eqranews.crawling.csproj", "eqranews.crawling/"]
RUN dotnet restore "eqranews.react.net.spa/eqranews.react.net.spa.csproj"
COPY . .
WORKDIR "/src/eqranews.react.net.spa"
RUN npm install -g gulp-cli
RUN dotnet build "eqranews.react.net.spa.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "eqranews.react.net.spa.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
RUN sed -i 's/DEFAULT@SECLEVEL=2/DEFAULT@SECLEVEL=1/g' /etc/ssl/openssl.cnf
RUN sed -i 's/DEFAULT@SECLEVEL=2/DEFAULT@SECLEVEL=1/g' /usr/lib/ssl/openssl.cnf
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "eqranews.react.net.spa.dll"]