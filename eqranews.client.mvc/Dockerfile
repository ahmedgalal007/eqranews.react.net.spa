#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["eqranews.client.mvc/eqranews.client.mvc.csproj", "eqranews.client.mvc/"]
RUN dotnet restore "eqranews.client.mvc/eqranews.client.mvc.csproj"
COPY . .
WORKDIR "/src/eqranews.client.mvc"
RUN dotnet build "eqranews.client.mvc.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "eqranews.client.mvc.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
RUN sed -i 's/DEFAULT@SECLEVEL=2/DEFAULT@SECLEVEL=1/g' /etc/ssl/openssl.cnf
RUN sed -i 's/DEFAULT@SECLEVEL=2/DEFAULT@SECLEVEL=1/g' /usr/lib/ssl/openssl.cnf
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "eqranews.client.mvc.dll"]