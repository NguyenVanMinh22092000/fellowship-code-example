@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\openapi-typescript\node_modules\prettier\bin-prettier.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\openapi-typescript\node_modules\prettier\bin-prettier.js" %*
)