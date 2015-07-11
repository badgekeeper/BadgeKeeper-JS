/**
 * Copyright Badge Keeper 2015
 * Licensed under The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */

var BadgeKeeper = function(getProjectBadgesUrl, getUserBadgesUrl, postUserVariablesUrl) {
	var projectBadgesUrl = getProjectBadgesUrl;
	var userBadgesUrl = getUserBadgesUrl;
	var postVariablesUrl = postUserVariablesUrl;

	this.get = function(userId, fnCallback, loadIcons) {
	    // Validation
	    if (isNullOrUndefined(projectBadgesUrl)) {
	        throw new Error("Error: code 1. You must set up projectBadgesUrl to get achievements by project.");
	    }
	    if (isNullOrUndefined(userBadgesUrl)) {
	        throw new Error("Error: code 2. You must set up userBadgesUrl to get achievements by project and user.");
	    }

        // Form url to get achievements by project or by project and user
	    var path = projectBadgesUrl + "?";
	    if (!isNullOrUndefined(userId)) {
	        path = userBadgesUrl + "?userId=" + userId + "&";
	    }
	    path += isLoadIconsPath(loadIcons);
		
		$.ajax({
			url: path,
			type: 'GET',
			contentType: 'application/json;charset=utf-8',
			
			success: function (response) {
			    if (!isNullOrUndefined(fnCallback)) {
			        fnCallback(response);
				}
            },
            error: function (xhr, status) {
                if (!isNullOrUndefined(fnCallback)) {
					fnCallback(status);
				}
            }
		});
	}

	this.post = function (userId, values, fnCallback) {
        // Validation
	    if (isNullOrUndefined(projectBadgesUrl)) {
	        throw new Error("Error: code 3. You must set up postVariablesUrl to post user values.");
	    }
	    if (isNullOrUndefined(userId)) {
	        throw new Error("Error: code 4. Cannot submit results without UserId provided.");
	    }

        // Form body with user values
	    var jsonData = [];
	    for (var i = 0; i < values.length; i++) {
	        var key = null;
	        var value = 0;
	        for (var item in values[i]) {
	            key = item;
	            value = values[i][key];
	        }

            // Body fields validation
	        if (isNullOrUndefined(key)) {
	            throw new Error("Error: code 5. Cannot submit results without achievement Name provided.");
	        }
	        if (isNullOrUndefined(value)) {
	            throw new Error("Error: code 6. Cannot submit results without achievement Value provided");
	        }
	        var item = { "Key": key, "Value": value };
	        jsonData.push(item);
	    }

	    // Form url to post user values
	    var path = postVariablesUrl + '?userId=' + userId;

	    $.ajax({
	        url: path,
	        type: 'POST',
	        data: JSON.stringify(jsonData),
	        contentType: 'application/json;charset=utf-8',

	        success: function (response) {
	            if (!isNullOrUndefined(fnCallback)) {
	                fnCallback(response);
	            }
	        },
	        error: function (xhr, status) {
	            if (!isNullOrUndefined(fnCallback)) {
	                fnCallback(status);
	            }
	        }
	    });
	}

	function isNullOrUndefined(value) {
		var result = (value == null);
		return result;
	}
    
	function isLoadIconsPath(isLoadIcons) {
	    var result = 'isLoadIcons=' + (isLoadIcons === true ? "true" : "false");
	    return result;
	}
}