$moduleHome = "$env:USERPROFILE\Documents\WindowsPowerShell\Modules\eco\eco.psm1"
new-item $moduleHome -ItemType file -Force | out-null
@"
function eco(){
    `$url = "http://10.67.29.129:3000/use/`$(`$args -join "/")/?format=ps1"
    iex ((new-object net.webclient).DownloadString(`$url))
}
Export-ModuleMember -Function eco
"@ | out-file $moduleHome -Force utf8