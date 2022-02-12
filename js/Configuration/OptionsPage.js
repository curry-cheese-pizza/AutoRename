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
 * This is important to declare in the HTML to determine what page the user is currently on.
 * Because this script is shared across all HTML files, there are elements that may not be
 * visible while on the page. Example, Twitter elements do not exist in the LINE BLOG HTML
 * file and vice versa.
 */
let htmlPageMeta = document.querySelector('meta[name="current_page"]').content;

document.onreadystatechange = () => {
    if (document.readyState == "complete") {
        document.getElementById("button_save").addEventListener("click", SaveOptions);
        loadHTMLSettings();
    }
}

let loadHTMLSettings = () => {

    switch (htmlPageMeta) {

        case "general":
            let generalPref = SettingsArray.filter((key) => {
                return key.category == CategoryEnum.General;
            });

            generalPref.forEach(function (x) {
                switch (x.key) {
                    case "global_show_download_folder":
                        document.getElementById("general_settings_auto_show_download_folder").checked = x.value
                        break;
                    case "global_enable_save_as_window":
                        document.getElementById("general_settings_enable_save_as_window").checked = x.value
                        break;
                    case "global_notifications_updated":
                        document.getElementById("general_settings_notification_updated").checked = x.value
                        break;
                }
            });
            break;

        case "twitter":
            let twitterPref = SettingsArray.filter((key) => {
                return key.category == CategoryEnum.Twitter
            });

            twitterPref.map(function (x) {
                switch (x.key) {
                    case "twitter_include_mention_symbol":
                        document.getElementById("twitter_settings_include_mention_symbol").checked = x.value;
                        break;
                    case "twitter_include_tweet_id":
                        document.getElementById("twitter_settings_include_tweet_id").checked = x.value;
                        break;
                    case "twitter_include_date":
                        document.getElementById("twitter_settings_include_date_checkbox").checked = x.value;
                        UseDateFormat(x.value);
                        break;
                    case "twitter_date_format":
                        document.getElementById("twitter_settings_select_date_format").value = x.value;
                        break;
                    case "twitter_random_string_length":
                        document.getElementById("twitter_settings_string_length").value = x.value;
                        break;
                    case "twitter_include_website_title":
                        document.getElementById("twitter_settings_site_title").checked = x.value;
                        break;
                }
            });
            break;

        case "lineblog":
            let lineblogPref = SettingsArray.filter((key) => {
                return key.category == CategoryEnum.LINE_BLOG
            });

            lineblogPref.map(function (x) {
                switch (x.key) {
                    case "lbPrefIncludeWebsiteTitle":
                        document.getElementById("lineblog_settings_include_site_title").checked = x.value;
                        break;
                    case "lbPrefIncludeBlogTitle":
                        document.getElementById("lineblog_include_blog_title").checked = x.value;
                        break;
                    case "lbPrefUseDate":
                        document.getElementById("lineblog_settings_include_date").checked = x.value;
                        LineBlogUseDateFormat(x.value);
                        break;
                    case "lbPrefDateFormat":
                        document.getElementById("lineblog_settings_select_date_format").value = x.value;
                        break;
                    case "lbPrefStringGenerator":
                        document.getElementById("lineblog_string_length").value = x.value;
                        break;
                    case "lineblog_convert_title_romaji":
                        document.getElementById("lineblog_settings_convert_title_romaji").checked = x.value;
                        break;
                }
            });
            break;

        case "reddit":

            let redditPref = SettingsArray.filter((key) => {
                return key.category == CategoryEnum.Reddit;
            });

            redditPref.map((x) => {
                switch (x.key) {

                    case "redditIncludeWebsite":
                        document.getElementById("reddit_settings_site_title").checked = x.value;
                        break;

                    case "redditIncludePostID":
                        document.getElementById("reddit_settings_subreddit_post_id").checked = x.value;
                        break;

                    case "redditIncludeDate":
                        document.getElementById("reddit_settings_include_date").checked = x.value;
                        RedditUseDateFormat(x.value);
                        break;

                    case "redditStringGenerator":
                        document.getElementById("reddit_settings_string_length").value = x.value;
                        break;

                    case "redditDateFormat":
                        document.getElementById("reddit_settings_select_date_format").value = x.value;
                        break;


                }
            });

            break;

        case "about":
            break;
    }


}

function SaveOptions() {


    switch (htmlPageMeta) {

        case "general":
            SaveSettings("global_show_download_folder", document.getElementById("general_settings_auto_show_download_folder").checked);
            SaveSettings("global_enable_save_as_window", document.getElementById("general_settings_enable_save_as_window").checked);
            SaveSettings("global_notifications_updated", document.getElementById("general_settings_notification_updated").checked);
            break;

        case "twitter":
            console.log("TEST")
            
            SaveSettings("twitter_include_mention_symbol", document.getElementById("twitter_settings_include_mention_symbol").checked);
            SaveSettings("twitter_include_tweet_id", document.getElementById("twitter_settings_include_tweet_id").checked);
            SaveSettings("twitter_include_date", document.getElementById("twitter_settings_include_date_checkbox").checked);
            SaveSettings("twitter_date_format", document.getElementById("twitter_settings_select_date_format").value);
            SaveSettings("twitter_random_string_length", document.getElementById("twitter_settings_string_length").value);
            console.log(document.getElementById("twitter_settings_site_title").checked)
            SaveSettings("twitter_include_website_title", document.getElementById("twitter_settings_site_title").checked);

            break;

        case "lineblog":
            SaveSettings("lbPrefIncludeWebsiteTitle", document.getElementById("lineblog_settings_include_site_title").checked);
            SaveSettings("lbPrefIncludeBlogTitle", document.getElementById("lineblog_include_blog_title").checked);
            SaveSettings("lbPrefUseDate", document.getElementById("lineblog_settings_include_date").checked);
            SaveSettings("lbPrefDateFormat", document.getElementById("lineblog_settings_select_date_format").value);
            SaveSettings("lbPrefStringGenerator", document.getElementById("lineblog_settings_string_length").value);
            SaveSettings("lineblog_convert_title_romaji", document.getElementById("lineblog_settings_convert_title_romaji").checked);
            break;

        case "reddit":
            SaveSettings("redditIncludeWebsite", document.getElementById("reddit_settings_site_title").checked);
            SaveSettings("redditIncludePostID", document.getElementById("reddit_settings_subreddit_post_id").checked);
            SaveSettings("redditIncludeDate", document.getElementById("reddit_settings_include_date").checked);
            SaveSettings("redditDateFormat", document.getElementById("reddit_settings_select_date_format").value);
            SaveSettings("redditStringGenerator", document.getElementById("reddit_settings_string_length").value);
            break;
    }

    swal("", chrome.i18n.getMessage("context_save_success"), "success", {
        buttons: false,
        timer: 1500
    });
}

switch (htmlPageMeta) {

    case "general":
        break;

    case "twitter":
        let twitterUseDateCheckBox = document.getElementById("twitter_settings_include_date_checkbox");
        let twitterSelectDateFormat = document.getElementById("twitter_settings_select_date_format");

        function UseDateFormat(IsUsingDate) {
            if (!IsUsingDate) {
                twitterSelectDateFormat.disabled = true;
            } else {
                twitterSelectDateFormat.disabled = false;
            }
        }

        twitterUseDateCheckBox.onchange = function () {
            if (!!this.checked) {
                twitterSelectDateFormat.disabled = false;
            } else {
                twitterSelectDateFormat.disabled = true;
            }
        }
        break;

    case "lineblog":
        let lineblogIsUsingDateChecked = document.getElementById("lineblog_settings_include_date");
        let lineblogDateFormatTypeSelect = document.getElementById("lineblog_settings_select_date_format");

        function LineBlogUseDateFormat(IsUsingDate) {
            if (!IsUsingDate) {
                lineblogDateFormatTypeSelect.disabled = true;
            } else {
                lineblogDateFormatTypeSelect.disabled = false;
            }
        }

        lineblogIsUsingDateChecked.onchange = function () {
            if (!!this.checked) {
                lineblogDateFormatTypeSelect.disabled = false;
            } else {
                lineblogDateFormatTypeSelect.disabled = true;
            }
        }
        break;

    case "reddit":
        let redditIsUsingDateChecked = document.getElementById("reddit_settings_include_date");
        let redditDateFormatTypeSelect = document.getElementById("reddit_settings_select_date_format");

        function RedditUseDateFormat(IsUsingDate) {
            if (!IsUsingDate) {
                redditDateFormatTypeSelect.disabled = true;
            } else {
                redditDateFormatTypeSelect.disabled = false;
            }
        }

        redditIsUsingDateChecked.onchange = function () {
            if (!!this.checked) {
                redditDateFormatTypeSelect.disabled = false;
            } else {
                redditDateFormatTypeSelect.disabled = true;
            }
        }


        break;

    case "about":
        break;

}