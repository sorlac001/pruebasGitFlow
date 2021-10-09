<script>
    import { navigate } from "svelte-routing";    
    import { clientOrderQuota } from "../../clients/ClientOrderQuota.svelte";
    import Calendar from "../../components/InstallationDate/Calendar.svelte";
    import Preloader from "../../components/Preloader.svelte";
    import { store } from "../../Store.svelte";
    
    let comments;
    let backHandler = ()=>{
        navigate("/purchase-summary",{replace:false});
    }
    let nextHandler = ()=>{
        let date = $store.installationDate.date;
        let schedule = $store.installationDate.schedule;
        if( date!="" && schedule!="" )
            navigate("/documents",{replace:false});
    }

    let payload = {
        "processId":$store.processId,
    };

    let schedulerDictionary = {
        "Matutino Instalacion 9-12":{
            time:{
                name:"Matutino",
                interval:"9am a 12pm"
            }
        },
        "Medio dia Instalacion 12-15":{
            time:{
                name:"Medio día",
                interval:"12pm a 3pm"
            }
        },
        "Vespertino Instalacion 15-17":{
            time:{
                name:"Vespertino",
                interval:"3pm a 5pm"
            }
        },
        "Nocturno Instalacion 17-19":{
            time:{
                name:"Nocturno",
                interval:"5pm a 7pm"
            }
        },
    }

    const responseOrderQuota = clientOrderQuota(payload);
    let dataCalendar = {"":{}}
    responseOrderQuota.then((data)=>{
        
        let dates = alasql("SELECT requestedShipDate date FROM ? GROUP BY requestedShipDate",[data]);
        dates.forEach(item => {
            let schedule = alasql("SELECT DISTINCT cvTimeslot schedule FROM ? WHERE requestedShipDate ='"+item.date+"'",[data]);            
            dataCalendar[item.date] = schedule;
        });


    });

    let clickScheduler =(schl)=>{        
        $store.installationDate.schedule = schl;
    }

    let daySelected = $store.installationDate.date;
</script>

{#await responseOrderQuota}
    
    <div class="pure-g">
        <div class="pure-u-1">
            <div class="text-center"><Preloader/></div>
        </div>
    </div>
{:then response} 
    
    <div class="container">
        <div class="wrapper">
            <div class="navbar">
                <div class="left">
                    <span class="indications">                                      
                        <h3 class="text-fs-20">Selecciona el día y horario de instalación</h3>                    
                    </span>
                </div>                
            </div>

            <div class="panel calendar">
                <div class="calendar-indications">
                    Elige una fecha y un horario
                    <br>
                    <br>
                </div>
                <div class="calendar-back">
                    <Calendar {daySelected} {dataCalendar} />
                </div>
                <br/>
                
                <div class="calendar-indications">
                    
                    <div class="div-234524">
                        {#each Object.entries(dataCalendar[$store.installationDate.date]) as [key,value] }
                            <div class="div-234525">
                                <div>{schedulerDictionary[value.schedule].time.name}</div>
                                <div>
                                    <div
                                        on:click={()=>{
                                            clickScheduler(value.schedule)
                                        }} 
                                        class="pure__button pure__button--light-primary">{schedulerDictionary[value.schedule].time.interval}</div>
                                </div>
                            </div>                        
                        {/each}
                    </div>
                </div>       
                <br/>
                <div>
                    <div class="calendar-indications">
                        Notas para el técnico instalador
                    </div>
                    <textarea name="" id="" cols="30" rows="10" style="margin: 0px; width: 561px; height: 135px;">
                    </textarea>
                </div>  
                <div class="calendar-indications-right">
                    {$store.installationDate.date+" - "+$store.installationDate.schedule}
                </div>     
            </div> 
            <div class="d-flex align-items-center justify-content-between">
                <div on:click={backHandler} class="back-link">
                    <svg class="icon" aria-hidden="true"><use xlink:href="/assets/img/icons/symbol-defs.svg#icon-arrow-left"></use></svg>
                    <span>atrás</span>
                </div>
                <div on:click={nextHandler}  class="pure__button pure__button--primary">Siguiente</div>
            </div>
        </div>
    </div>
{/await}
<style>
    .div-234524 {
        display: flex;
        justify-content: center;
        width:100%;
    }
    .div-234525 {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1px;
    }

    .container {
        display: flex;
        width: 100%;
        justify-content: center;
    }
    .wrapper {
        width: 100%;
        max-width: 680px;
    }
    .navbar {
        display: flex;
        margin-bottom: 22px;
        margin-top: 40px;
        
    }
    .navbar > .left {
        width:100%;
        display: flex;
        justify-content: left;
    }
    .indications {
        display: flex;
        text-align: left;        
        font-size: 20px;
        /* max-width: 400px; */
    }
    .calendar{
        margin-bottom: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    .calendar-back {
        background: #F5F6F8;
        width: 560px;
        height:500px;
        display: flex;
        flex-direction: column; 
        align-items: center;
        border-radius:8px;
    }
    .calendar-indications{
        display: flex;
        text-align: left; 
        /* border: solid 1px; */
        width: 100%;
    }
    .calendar-indications-right{
        display: flex;
        justify-content: flex-end; 
        /* border: solid 1px; */
        width: 100%;
    }
</style>