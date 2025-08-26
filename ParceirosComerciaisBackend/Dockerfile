# syntax=docker/dockerfile:1


FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080 \
    ASPNETCORE_ENVIRONMENT=Production \
    DOTNET_enableDiagnostics=0

    
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY . .

ARG PROJECT_PATH=ParceirosComerciaisBackend/ParceirosComerciais.csproj

RUN dotnet restore "$PROJECT_PATH"
RUN dotnet build "$PROJECT_PATH" -c Release -o /app/build
RUN dotnet publish "$PROJECT_PATH" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "ParceirosComerciais.dll"]