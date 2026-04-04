[Setup]
AppName=Infobench UI MES Service
AppVersion=1.0.0
AppPublisher=Infobench Solutions LLP
AppPublisherURL=https://infobench.in
DefaultDirName={pf}\infobenchPartdataUI
DefaultGroupName=infobenchPartdataUI
OutputDir=../../installers
OutputBaseFilename=infobenchPartdataUIInstaller
Compression=lzma
SolidCompression=yes

[Files]
Source: "serve-ui.js"; DestDir: "{app}"; Flags: ignoreversion
Source: "package.json"; DestDir: "{app}"; Flags: ignoreversion
Source: "node_modules\*"; DestDir: "{app}\node_modules"; Flags: recursesubdirs ignoreversion
Source: "dist\*"; DestDir: "{app}\dist"; Flags: recursesubdirs ignoreversion
Source: "nssm.exe"; DestDir: "{app}"; Flags: ignoreversion

[Dirs]
Name: "{app}\logs"

[Run]
; Install the service using cmd.exe so node from PATH is used
Filename: "{app}\nssm.exe"; \
  Parameters: "install infobenchPartdataUI ""cmd.exe"" /c node serve-ui.js"; \
  Flags: runhidden

; Set working directory
Filename: "{app}\nssm.exe"; \
  Parameters: "set infobenchPartdataUI AppDirectory ""{app}"""; \
  Flags: runhidden

; Set stdout and stderr logs
Filename: "{app}\nssm.exe"; \
  Parameters: "set infobenchPartdataUI AppStdout ""{app}\logs\output.log"""; \
  Flags: runhidden

Filename: "{app}\nssm.exe"; \
  Parameters: "set infobenchPartdataUI AppStderr ""{app}\logs\error.log"""; \
  Flags: runhidden

; Set to rotate logs on each start (optional)
Filename: "{app}\nssm.exe"; \
  Parameters: "set infobenchPartdataUI AppRotateFiles 1"; \
  Flags: runhidden

; ✅ Start the service
Filename: "{app}\nssm.exe"; \
  Parameters: "start infobenchPartdataUI"; \
  Flags: runhidden

[UninstallRun]
Filename: "{app}\nssm.exe"; \
  Parameters: "stop infobenchPartdataUI"; \
  Flags: runhidden

Filename: "{app}\nssm.exe"; \
  Parameters: "remove infobenchPartdataUI confirm"; \
  Flags: runhidden
