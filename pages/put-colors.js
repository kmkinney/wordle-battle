
function getColors(target, guess) {
    let colors = []
    let tlc = new Map()
    for(let i = 0; i < target.length; i++){
        let tl = target[i]
        if(tlc.has(tl)){
            tlc.set(tl, tlc.get(tl) + 1)
        }
        else{
            tlc.set(tl, 1)
        }
    }
    for(let i = 0; i < target.length; i++){
        let tl = target[i]
        let gl = guess[i]
        if(tl === gl){
            colors.push('green')
            tlc.set(gl, tlc.get(gl) - 1)
        }
        else if(tlc.has(gl) && tlc.get(gl) > 0){
            colors.push('yellow')
            tlc.set(gl, tlc.get(gl) - 1)
        }
        else{
            colors.push('grey')
        }
    }
    return colors
}

let t = "abcde"
let g = "aaaaa"

console.log(getColors(t, g))