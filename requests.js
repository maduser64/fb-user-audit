var peopleListSel = '#pagelet_requests_queue ._8u._42ef'
var profLinkSel = '.fsm.fwn.fcg .fsl.fwb.fcb a'
var groupCountSel = '._8u._42ef li'

function addLinks () {
  var people = [...document.querySelectorAll(peopleListSel)]
  people.forEach(person => {
    var [profLinkElem, profLinkUrl] = getProfileLink(person)
    var groupCount = getGroupCount(person)
    var s = 's'
    if (groupCount === 1) s = ''
    var auditNode = document.createElement('a')
    auditNode.className = 'audit-link'
    auditNode.innerText = `${groupCount} group${s}`
    auditNode.setAttribute('href', `${profLinkUrl}/groups`)
    profLinkElem.parentNode.appendChild(auditNode)
  })
}

function getProfileLink (person) {
  var link = person.querySelector(profLinkSel)
  return [link, link.getAttribute('href')]
}

function getGroupCount (person) {
  var lis = person.querySelectorAll(groupCountSel)
  var countNode = lis[1]
  var rx = /Member of (\d+) groups?/g
  var match = rx.exec(countNode.innerText)
  countNode.parentNode.removeChild(countNode)
  if (!match) return 0
  return Number(match[1])
}

addLinks()
