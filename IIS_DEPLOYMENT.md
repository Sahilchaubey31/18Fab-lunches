# IIS Deployment Guide

## Prerequisites
- Windows Server or Windows with IIS installed
- .NET 9.0 Hosting Bundle
- IIS URL Rewrite Module

## Step 1: Install .NET 9.0 Hosting Bundle

Download and install from: https://dotnet.microsoft.com/download/dotnet/9.0

Select "Hosting Bundle" for Windows.

## Step 2: Publish the Application

```bash
cd d:\18Fab-lunches\backend\ECommerceAPI
dotnet publish -c Release -o "C:\inetpub\wwwroot\ECommerceAPI"
```

## Step 3: Create IIS Application Pool

1. Open IIS Manager
2. Right-click "Application Pools" > "Add Application Pool"
3. Name: `ECommerceAPI`
4. .NET CLR version: `No Managed Code`
5. Managed pipeline mode: `Integrated`
6. Click OK

## Step 4: Create IIS Website

1. Right-click "Sites" > "Add Website"
2. Site name: `ECommerceAPI`
3. Application pool: `ECommerceAPI`
4. Physical path: `C:\inetpub\wwwroot\ECommerceAPI`
5. Binding:
   - Type: `https`
   - IP: `All Unassigned`
   - Port: `443`
   - SSL certificate: Select your certificate (or create self-signed)
6. Click OK

## Step 5: Configure web.config

The published app includes web.config. Verify it contains:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <location path="." inheritInChildApplications="false">
    <system.webServer>
      <handlers>
        <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
      </handlers>
      <aspNetCore processPath="dotnet" arguments=".\ECommerceAPI.dll" stdoutLogEnabled="false" stdoutLogFile=".\logs\stdout" hostingModel="inprocess" />
    </system.webServer>
  </location>
</configuration>
```

## Step 6: Update Android App

Update `RetrofitClient.kt` with your server IP:

```kotlin
private const val BASE_URL = "https://YOUR_SERVER_IP/"
```

Replace `YOUR_SERVER_IP` with your actual server IP address.

## Step 7: Test

Access from browser: `https://YOUR_SERVER_IP/api/products`

## Troubleshooting

- Check IIS logs: `C:\inetpub\logs\LogFiles`
- Verify app pool is running
- Check firewall allows port 443
- Ensure SSL certificate is valid
