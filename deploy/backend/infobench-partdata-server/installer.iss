[Setup]
PrivilegesRequired=admin
AppName=Infobench MES Service
AppVersion=1.0.0
AppPublisher=Infobench Solutions LLP
AppPublisherURL=https://infobench.in
DefaultDirName={pf}\infobenchPartdataServer
DefaultGroupName=infobenchPartdataServer
OutputDir=../../installers
OutputBaseFilename=infobenchPartdataServerInstaller
Compression=lzma
SolidCompression=yes

[Files]
Source: "dist\server.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "nssm.exe"; DestDir: "{app}"; Flags: ignoreversion
; Source: ".env.production"; DestDir: "{app}"; Flags: ignoreversion

[Run]
; Create logs directory before configuring stdout/stderr
Filename: "cmd.exe"; \
  Parameters: "/C mkdir ""{app}\logs"""; \
  Flags: runhidden

; Install the service
Filename: "{app}\nssm.exe"; \
  Parameters: "install infobenchPartdataServer ""{app}\server.exe"""; \
  Flags: runhidden

; Set AppDirectory
Filename: "{app}\nssm.exe"; \
  Parameters: "set infobenchPartdataServer AppDirectory ""{app}"""; \
  Flags: runhidden

; Set AppStdout and AppStderr
;Filename: "{app}\nssm.exe"; \
;  Parameters: "set infobenchPartdataServer AppStdout ""{app}\logs\service.log"""; \
;  Flags: runhidden

;Filename: "{app}\nssm.exe"; \
;  Parameters: "set infobenchPartdataServer AppStderr ""{app}\logs\error.log"""; \
;  Flags: runhidden

; Enable autostart on boot
Filename: "{app}\nssm.exe"; \
  Parameters: "set infobenchPartdataServer Start SERVICE_AUTO_START"; \
  Flags: runhidden

; Start the service
Filename: "{app}\nssm.exe"; \
  Parameters: "start infobenchPartdataServer"; \
  Flags: runhidden

[UninstallRun]
; Stop and remove the service
Filename: "{app}\nssm.exe"; \
  Parameters: "stop infobenchPartdataServer"; \
  Flags: runhidden

Filename: "{app}\nssm.exe"; \
  Parameters: "remove infobenchPartdataServer confirm"; \
  Flags: runhidden
