var id = 1;
function login() {
    $.ajax({
        url: '/rpc',
        data: JSON.stringify({
            id: id++,
            jsonrpc: '2.0',
            method: 'identity.check',
            params: {
                username: 'dido',
                password: 'epich'
            }
        }),
        type: 'POST',
        success: function(data) {
            alert('The result is : ' + data);
        },
        error: function(err) {
            alert('Error', err);
        }
    });
}
