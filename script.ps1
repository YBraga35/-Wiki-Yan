# ainda em C:\Users\Yanbd\dev\-Wiki-Yan
Get-Content .\missing-content.txt | ForEach-Object {
    $source = "C:\Users\Yanbd\dev\restore-2734866\$_"
    $target = "C:\Users\Yanbd\dev\-Wiki-Yan\$_"

    $targetDir = Split-Path $target
    if (-not (Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir | Out-Null
    }

    if (Test-Path $source) {
        Copy-Item $source $target -Force
    }
}
