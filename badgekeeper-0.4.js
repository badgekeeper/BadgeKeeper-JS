/**
 * Copyright Badge Keeper 2015
 * Licensed under The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */

var BadgeKeeper = function(pId, isProduction) {

    var projectId = pId;
    var isStagingArea = isNullOrUndefined(isProduction) ? true : false;
    var stagingUrl = 'https://api.badgekeeper.net/';//'https://badgesapi.azurewebsites.net/'
    var projectBadgesUrl = null;
    var userBadgesUrl = null;
    var postVariablesUrl = null;

    this.setUrls = function(getProjectBadgesUrl, getUserBadgesUrl, postUserVariablesUrl) {
        projectBadgesUrl = getProjectBadgesUrl;
        userBadgesUrl = getUserBadgesUrl;
        postVariablesUrl = postUserVariablesUrl;
    };

    var validate = function(path) {
	    if (isNullOrUndefined(path)) {
	        throw new Error("Error: code 1. Path is invalid Please check settings.");
	    }
	    if (isNullOrUndefined(projectId)) {
	        throw new Error("Error: code 2. You must set up project id property.");
	    }
    };

	this.get = function(userId, fnCallback, loadIcons) {
	    // Form url to get achievements by project or by project and user
	    var path = projectBadgesUrl;
	    if (isStagingArea) {
	        if (isNullOrUndefined(userId)) {
	            path = stagingUrl + 'api/gateway/' + projectId + '/get/' + userId;
	        } else {
	            path = stagingUrl + 'api/gateway/' + projectId + '/users/get/' + userId;
	        }
	    }
	    path += shouldLoadIconsPath(loadIcons);
	    validate(path);
		
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
	};

	this.post = function (userId, values, fnCallback) {
	    // Form url to post user values
	    var path = postVariablesUrl;
	    if (isStagingArea) {
	        path = stagingUrl + 'api/gateway/' + projectId + '/users/post/' + userId;
	    }

	    validate(path);
	    if (isNullOrUndefined(userId)) {
	        throw new Error("Error: code 3. Cannot submit results without user id provided.");
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
	            throw new Error("Error: code 4. Cannot submit results without achievement Name provided.");
	        }
	        if (isNullOrUndefined(value)) {
	            throw new Error("Error: code 5. Cannot submit results without achievement Value provided");
	        }
	        var item = { "Key": key, "Value": value };
	        jsonData.push(item);
	    }

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
	};

	function isNullOrUndefined(value) {
		var result = (value == null);
		return result;
	};
    
	function shouldLoadIconsPath(shouldLoadIcons) {
	    var result = '?shouldLoadIcons=' + (shouldLoadIcons === true ? "true" : "false");
	    return result;
	};
}