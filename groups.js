var groupListSel = '._agv'
var groupNameSel = '.fwb a'
var memberCountSel = '.fcg'
var headerTabSel = '._3cz [role="tablist"]'

function gatherGroups () {
  var groups = [...document.querySelectorAll(groupListSel)]
  return groups
    .map(group => [group, group.querySelector(groupNameSel)])
    .filter(([group, linkElem]) => group && linkElem)
    .map(([group, linkElem]) => {
      return {
        name: linkElem.innerText,
        members: getMemberCount(group),
        url: linkElem.getAttribute('href')
      }
    })
}

function getMemberCount (group) {
  var raw = group.querySelector(memberCountSel).innerText
  var clean = Number(raw.replace(/\D/g, ''))
  return clean
}

function showGroups () {
  var groups = gatherGroups()
  groups.sort((a, b) => b.members - a.members)  // descending
  var asStrings = groups.map(group => {
    return `${group.members}: ${group.name}`
  })
  alert(asStrings.join('\n'))
}

function addLink () {
  var link = document.createElement('a')
  link.innerText = 'View group breakdown'
  link.onclick = () => {
    showGroups()
  }
  var headerTabs = document.querySelector(headerTabSel)
  headerTabs.appendChild(link)
}

addLink()
