const React = require('react')

function Default(html){
    return (
        <html>
            <head>
                <title>Default</title>
            </head>
            <body>
                <h1>HTML Rendered!</h1>
                <div className ="container"></div>
                {html.children}
            </body>
        </html>
    )
}

module.exports = Default