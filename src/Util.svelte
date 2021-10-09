<script context="module">
    export function format(mount){
        return Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(mount);
    };
    export function formatWithoutCents(mount){
        let money = format(mount);
        return money.substring(0,money.length-2);
    };

    export const Util = {
        refresh:{
            onkeydownHandler( event ) {
                switch (event.keyCode) { 
                    case 116 : // 'F5'
                        //alert("Refresh no permitido");
                        event.preventDefault();
                        event.keyCode = 0;
                        window.status = "F5 disabled";
                        break;
    
                }
            },
            disabled:()=>{                
                document.addEventListener("keydown", Util.refresh.onkeydownHandler);
                window.onbeforeunload = function(e) {
                    return '';
                };
            }
        }
    }
</script>
