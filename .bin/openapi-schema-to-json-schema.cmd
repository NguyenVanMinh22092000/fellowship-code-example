@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\@openapi-contrib\openapi-schema-to-json-schema\dist\bin.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\@openapi-contrib\openapi-schema-to-json-schema\dist\bin.js" %*
)