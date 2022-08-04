const colorContainer = document.querySelector("#color-container")
let colorHtml = ""

/* Get and render color scheme from API  */

document.querySelector("#parameters").addEventListener("submit", function(e){
    e.preventDefault()
    const inputColor = document.querySelector("#select-color").value.slice(1)
    const inputMode = document.querySelector("#scheme-mode").value

    fetch(`https://www.thecolorapi.com/scheme?hex=${inputColor}&mode=${inputMode}`)
        .then(res => res.json())
        .then(data => {
            colorHtml = ""
            for (let color of data.colors) {
            colorHtml += `
                <div class="color"><h4>${color.hex.value}</h4></div>
            `
        }

        colorContainer.innerHTML = colorHtml
        const colorsEl = document.querySelectorAll(".color")

        for (let i=0; i < data.colors.length; i++) {
            colorsEl[i].style.background = data.colors[i].hex.value
            colorsEl[i].children[0].textContent = data.colors[i].hex.value
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

