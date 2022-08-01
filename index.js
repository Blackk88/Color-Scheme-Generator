const colorContainer = document.querySelectorAll(".color")

/* Get and render color scheme from API  */

document.querySelector("#parameters").addEventListener("submit", function(e){
    e.preventDefault()
    const inputColor = document.querySelector("#select-color").value.slice(1)
    const inputMode = document.querySelector("#scheme-mode").value

    fetch(`https://www.thecolorapi.com/scheme?hex=${inputColor}&mode=${inputMode}`)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.colors.length; i++) {
            colorContainer[i].style.background = data.colors[i].hex.value
            colorContainer[i].children[0].textContent = data.colors[i].hex.value
        }
    })
    
})

/* Copying color code to clipboard and display that */
document.querySelector("#color-container").addEventListener("click", function(e){
    navigator.clipboard.writeText(e.target.textContent)

        const color = e.target.textContent
        e.target.childNodes[0].textContent = "Copied"
    
        setTimeout(function(){
            e.target.childNodes[0].textContent = color
        }, 400)
})

