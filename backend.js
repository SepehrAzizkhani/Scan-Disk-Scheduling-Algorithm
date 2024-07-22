
const maxRows = 20;
const minRows = 1;
var seekSequence = [];
var seekTime = 0;
var headPosition;
var diskSize = 0;
function addRow() {
    var table = document.getElementById("req-seq");
    var count = table.rows.length;
    if (count == minRows+1) {
        var removeBtn = document.getElementById("remove");
        removeBtn.disabled = false;
    } if (count == maxRows)
    { var addBtn = document.getElementById("add"); addBtn.disabled = true;
    } if (count < minRows+1 || count > maxRows) return;
    var row = table.insertRow(count);
    var th = document.createElement("th");
    th.innerHTML = count; th.scope = "row";
    var td = document.createElement("td");
    var input = document.createElement("input")
    input.type = "text"; input.id = "req-seq" + count;
    td.appendChild(input);
    row.appendChild(th);
    row.appendChild(td);}
function removeRow()
{
    var table = document.getElementById("req-seq");
    var count = table.rows.length; count--;
    if (count == maxRows) {
        var addBtn = document.getElementById("add");
        addBtn.disabled = false;
    } if (count == minRows+1) {
        var removeBtn = document.getElementById("remove");
        removeBtn.disabled = true;
    } if (count < minRows+1 || count > maxRows)

    return; table.deleteRow(count); }

function scan() {
    var headPos = 0; headPos = document.getElementById("head-pos").value;
    diskSize = document.getElementById("disk-size").value; headPos = parseInt(headPos);
    headPosition = headPos;
    diskSize = parseInt(diskSize);
    if (!Number.isInteger(headPos) || !Number.isInteger(diskSize)) { alert('Please enter an Integer in Disk Size and Head Position.');
return false; }
    if (headPos < 0 || diskSize < 0) {
        alert('Invalid Input, Disk Size or Head Position should not be negative.');
        return false;
    }
    if (headPos > diskSize) {
        alert('Invalid Head Position. Head Position should be less than or equal to Disk Size.');
        return false; }
    var direction = document.getElementById("Right").checked;
    var arr = takeInput();
    if (arr === undefined) return false;
    var answer = scanScheduling(arr, headPos, direction);
    var result = document.getElementById("result");
    var seekCnt = document.createElement("p");
    var seekSq = document.createElement("p");
    result.innerHTML = "Results:";
    seekSq.innerHTML = "Seek Sequence:" + answer.seekSeq;
    result.appendChild(seekCnt);
    result.appendChild(seekSq);

    seekSequence = answer.seekSeq;
    seekTime = answer.seekCount;
}
function takeInput()
{ var table = document.getElementById("req-seq");
    var count = table.rows.length; var arr = [];
    for (let i=1; i<count; i++) {
        var inpId = "req-seq" + i;
        arr.push(parseInt(document.getElementById(inpId).value));
    }
    return arr; }
function scanScheduling(arr, headPos, direction) {
    var seekCount = 0;
    var seekSeq = [];
    arr.sort(function(a, b) { return a - b; });
    var moveIndex = 0; while (moveIndex < arr.length && arr[moveIndex] < headPos) {
    moveIndex++; }
    if (direction) {
        for (let i = moveIndex; i < arr.length; i++) {
            seekSeq.push(arr[i]);
            seekCount += Math.abs(arr[i] - headPos); headPos = arr[i];
        }
         for (let i = moveIndex - 1; i >= 0; i--) {
             seekSeq.push(arr[i]);
             seekCount += Math.abs(arr[i] - headPos); headPos = arr[i];
         } }
    else {
        for (let i = moveIndex - 1; i >= 0; i--) {
        seekSeq.push(arr[i]);
        seekCount += Math.abs(arr[i] - headPos);
        headPos = arr[i]; }
        for (let i = moveIndex; i < arr.length; i++) {
    seekSeq.push(arr[i]); seekCount += Math.abs(arr[i] - headPos); headPos = arr[i];
        } }
    return { seekCount, seekSeq };
}
