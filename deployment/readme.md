For ARM Deployment:
***Note that ARM template does not set up the QnAMaker correctly so please do not use yet - set up using deployment guide***

- Open a PowerShell command prompt
- To login type: Login-AzureRmAccount
    - Note that if this does not work,m you may need to install the Azure PowerShell https://docs.microsoft.com/en-us/powershell/azure/install-az-ps?view=azps-3.3.0
- For multiple subscriptions get a list by typing: Get-AzureRmSubscription to list all your subs
- Now select : Select-AzureRmSubscription -SubscriptionId <Subscription Id>
- Update the parameters in your parameters.json file
- Run the command below to deploy your template on Azure
    - .\Deploy-AzureResourceGroup.ps1 -ResourceGroupLocation <Location e.g. UKSouth> -ResourceGroupName <Name of the resource group e.g. ccep-dwh-deptest> 

For SharePoint Site Creation:
Connect-PnPOnline https://<tenant>.sharepoint.com/sites/<sitename>