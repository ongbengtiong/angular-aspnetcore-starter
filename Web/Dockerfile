# FROM microsoft/aspnetcore-build:2.0 AS build-env
#FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS build-env
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env

WORKDIR /app



#https://stackoverflow.com/questions/51918919/how-to-integrate-npm-install-into-asp-net-core-2-1-docker-build
# Prevent 'Warning: apt-key output should not be parsed (stdout is not a terminal)'
ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=1

# install NodeJS 13.x
# see https://github.com/nodesource/distributions/blob/master/README.md#deb
RUN apt-get update -yq 
RUN apt-get install curl gnupg -yq 
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash -
RUN apt-get install -y nodejs


# copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore


# copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out


# build runtime image
#FROM microsoft/aspnetcore:2.0
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "my-new-app.dll"]



#docker build --pull -t aspnetapp .
#docker run --rm -it -p 8000:80 aspnetapp
