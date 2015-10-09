# BadgeKeeper
BadgeKeeper service lightweight Javascript client library.

## Adding BadgeKeeper to your project
Download and install badgekeeper.min.js (for production use) or badgekeeper.js to your project.

### How to use

#### Setup project
```
var projectId = <ProjectId from admin panel>;
var bk = new BadgeKeeper(projectId);
```
#### Post variable
```
var userId = <Your client id>;
var values = [{ variable: value }, { ... }];
var handler = function(n) {
  if (n.Error !== null) {
    // Error handling
  }
  else {
    // Work with array of achievements in "n.Result"
  }
};

bk.post(userId, values, handler);
```
#### Increment variable
Coming soon

#### Get user achievements
```
var userId = <Your client id>;
var shouldLoadIcons = <Send request with load icons or not (true / false)>;
var handler = function(n) {
  if (n.Error !== null) {
    // Error handling
  }
  else {
    // Work with array of achievements in "n.Result"
  }
};

bk.get(userId, handler, shouldLoadIcons);
```

#### Get project achievements
To get project achievements use the same method as user achievements. But set userId to null;

## License
MIT. See `LICENSE` for details.
