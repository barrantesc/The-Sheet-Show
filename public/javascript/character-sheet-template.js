/*
    Notes: from Erik Plachta
        This was taken from an existing codepen, see source below, and then re-worked
        for our project needs. 

    Source: https://codepen.io/lubos-pobezal/pen/abmaXwx
*/

//-- Record
$('.stat').bind('input', function() {
  var inputName = $(this).attr('name')
  var mod = parseInt($(this).val()) - 10
  
  if (mod % 2 == 0)
    mod = mod / 2
  else
    mod = (mod - 1) / 2

  if (isNaN(mod))
    mod = ""
  else if (mod >= 0)
    mod = "+" + mod

  var scoreName = inputName.slice(0, inputName.indexOf("score"))
  var modName = scoreName + "mod"
  
  $("[name='" + modName + "']").val(mod)
})

$('.statmod').bind('change', function()
{
var name = $(this).attr('name')
name = "uses" + name.slice(0, name.indexOf('mod'))

})

$("[name='classlevel']").bind('input', function()
{
var classes = $(this).val()
var r = new RegExp(/\d+/g)
var total = 0
var result
while ((result = r.exec(classes)) != null)
{
  var lvl = parseInt(result)
  if (!isNaN(lvl))
    total += lvl
}
var prof = 2
if (total > 0)
{
  total -= 1
  prof += Math.trunc(total/4)
  prof = "+" + prof
}
else
{
  prof = ""    
}
$("[name='proficiencybonus']").val(prof)
})

$("[name='totalhd']").bind('input', function()
{
$("[name='remaininghd']").val($(this).val())
})

function totalhd_clicked()
{
$("[name='remaininghd']").val($("[name='totalhd']").val())
}
