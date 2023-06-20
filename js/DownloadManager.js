/** MIT License
 * 
 * Copyright (c) 2021 Dasutein
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, 
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
 * is furnished to do so, subject to the following conditions:
 * 
 * See more: https://github.com/ddasutein/AutoRename/blob/master/LICENSE
 * 
 */

/**
 * Start downloading files
 * 
 * @param {object} downloadQueue Images that are in queue to download
 */
function StartDownload(downloadQueue){

    Object.values(Settings.Load().General.map((key, index)=>{
        switch (index){
            
            // global_enable_save_as_window
            case 1:
                if (key.value == true){
                    downloadQueue.forEach((dq)=>{
                        chrome.downloads.download({
                            url: dq.url,
                            filename: dq.filename,
                            saveAs: true
                        });
                    });
                } else {
                    downloadQueue.forEach((dq)=>{
                        chrome.downloads.download({
                            url: dq.url,
                            filename: dq.filename,
                            saveAs: false
                        });
                    });
                }
                break;
        }
    }));
}

chrome.downloads.onChanged.addListener(function (downloadDelta) {
    chrome.storage.local.get({
        showDownloadFolderCheckbox: false
    }, function (items) {
        if (downloadDelta.state && downloadDelta.state.current == "complete") {

            if (DevMode){
                const DEBUG_TAG = "downloadsOnChangedListener => ";
                console.log(DEBUG_TAG + downloadDelta.state.current);
            }

            let generalSettings = Settings.Load().General;

            generalSettings.map((key, index) => {
                switch (index){
                    case 0:
                        if (key.value){
                            chrome.downloads.showDefaultFolder();
                        }
                        break;
                }
            });

            return;
        }
    });
});