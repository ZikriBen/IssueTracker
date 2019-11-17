document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignTo = document.getElementById('issueAssignToInput').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';

    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignTo: issueAssignTo,
        status: issueStatus
    }
    if (localStorage.getItem('issues') == null){
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else{
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify('issues'));
    }
    document.getElementById('issueInputForm').reset();
    fetchIssues();

    e.preventDefault();
}

function setStatusClosed(id){
    var issues = JSON.parse(localStorage.getItem('issues'));
    for (var i = 0; i < issues.length; i++){
        if (issues[i].id == id){
            issues[i] = 'Closed';
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for (var i = 0; i < issues.length; i++){
        if (issues[i].id == id){
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function fetchIssues(){
   var issues = JSON.parse(localStorage.getItem('issues'));
   var issuesList = document.getElementById('issuesList');

   issuesList.innerHTML = '';

   for (var i = 0; i < issues.length; i++){
    var id = issues[i].id;
    var description = issues[i].description;
    var severity = issues[i].severity;
    var assignTo = issues[i].assignTo;
    var status = issues[i].status;

    issuesList.innerHTML += '<div class="well">' + 
                            '<h6>Issue ID: ' + id + '</h6>' + 
                            '<p><span class="label label-info">' + status +
                            '</span></p>' + '<h3>' + description + '</h3>' +
                            '<p><span class="glyphicon glyphicon-time"></span>' + severity +'</p>' +
                            '<p><span class="glyphicon glyphicon-user"></span>' + assignTo +'</p>' +
                            '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                            '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                            '</div>';

   } 
}