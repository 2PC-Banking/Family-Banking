# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0-preview AS build
WORKDIR /app

# Copy csproj files and restore
COPY src/FamilyBank.Domain/*.csproj ./src/FamilyBank.Domain/
COPY src/FamilyBank.Application/*.csproj ./src/FamilyBank.Application/
COPY src/FamilyBank.Infrastructure/*.csproj ./src/FamilyBank.Infrastructure/
COPY src/FamilyBank.Api/*.csproj ./src/FamilyBank.Api/

RUN dotnet restore src/FamilyBank.Api/FamilyBank.Api.csproj

# Copy everything and build
COPY src/ ./src/
RUN dotnet publish src/FamilyBank.Api/FamilyBank.Api.csproj -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080
ENTRYPOINT ["dotnet", "FamilyBank.Api.dll"]
