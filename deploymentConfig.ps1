
param ( 
    [Parameter(Mandatory=$true)]
    $rootPath,
    [Parameter(Mandatory=$true)]
    $redirectUri,
    [Parameter(Mandatory=$true)]
    $clientID
)


$allFiles = Get-ChildItem -Path $rootPath | Sort-Object LastWriteTime -descending
$allFileCount = $allFiles.Count
Write-Output "$allFileCount files found from all of them"
$mainFiles = Get-ChildItem -Filter *app* -Path $rootPath | Sort-Object LastWriteTime -descending
#Select the most recent mainfile
Write-Output "Finding main files at path: $rootPath"
$mainFileCount = $mainFiles.Count
Write-Output "$mainFileCount files found"
Write-Output "Updating ${$mainFiles[0].FullName}"
Write-Output "Setting to $clientID, $redirectUri"

$mainFileText = Get-Content -Raw -Path $mainFiles[0].FullName
#ClientId
$mainFileText = $mainFileText.Replace("66f0e07f-a642-45fa-b059-c360faf16b50","$clientID")
#RedirectUri
$mainFileText = $mainFileText.Replace("66f0e07f-a642-45fa-b059-c360faf16b50","$clientID")

$mainFileText = $mainFileText.Replace("tenant:""tenantToReplace""","tenant:""$tenant""")
$mainFileText = $mainFileText.Replace("signUpSignInPolicy:""policyToReplace""","signUpSignInPolicy:""$signUpSignInPolicy""")
$mainFileText = $mainFileText.Replace("b2cScopes:[""clientIDToReplace""]","b2cScopes:[""$clientID""]")

#APP_CLIENT_ID=66f0e07f-a642-45fa-b059-c360faf16b50
$mainFileText = $mainFileText.Replace("66f0e07f-a642-45fa-b059-c360faf16b50","$clientID")
#APP_REDIRECT_URI=http://localhost:3000
$mainFileText = $mainFileText.Replace("http://localhost:3000","$redirectUri")
#APP_POST_LOGOUT_REDIRECT_URI=http://localhost:3000/loggedOut.html
#APP_AUTHORITY=https://login.microsoftonline.com/b8f3e261-4c86-4ac7-9365-67df300bb13d
#$mainFileText = $mainFileText.Replace("https://login.microsoftonline.com/b8f3e261-4c86-4ac7-9365-67df300bb13d","$authority")
#APP_SHAREPOINT_TENANT=m365x809970
#$mainFileText = $mainFileText.Replace("m365x809970","$sharePointTenant")
#QNAMAKER_HOST=ccep-dwh-qa
#$mainFileText = $mainFileText.Replace("ccep-dwh-qa","$qnaMakerHost")
#QNAMAKER_KEY=3e5613e7-eb37-4d52-b353-cd3ffee726a7
#$mainFileText = $mainFileText.Replace("3e5613e7-eb37-4d52-b353-cd3ffee726a7","$qnaMakerKey")
#SP_APPCATALOG_GRAPHID=m365x809970.sharepoint.com,e1ba37b2-751b-42de-9bab-be74ffbea41b,46f7de5a-cd84-455f-ad29-3be5596a7890
#$mainFileText = $mainFileText.Replace("m365x809970.sharepoint.com,e1ba37b2-751b-42de-9bab-be74ffbea41b,46f7de5a-cd84-455f-ad29-3be5596a7890","$appCatalogSiteId")
#SP_APPCATALOG_FEEDBACKLISTID=dc94e7a3-658e-4f41-b6d3-fa2eac515a64
#$mainFileText = $mainFileText.Replace("dc94e7a3-658e-4f41-b6d3-fa2eac515a64","$appCatalogFeedbackListId")


$mainFileText | Out-File $mainFiles[0].FullName