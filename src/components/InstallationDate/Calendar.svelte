<script>
	import calendarize from 'calendarize';
	import { store } from '../../Store.svelte';
	import Arrow from './Arrow.svelte';
	
	export let year = (new Date()).getFullYear();
	export let month = (new Date()).getMonth();
	export let offset = 0; // Sun
	export let today = new Date;
	export let dataCalendar = {};
	export let labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	export let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	
	export let daySelected = "";

	$: today_month = today && today.getMonth();
	$: today_year = today && today.getFullYear();
	$: today_day = today && today.getDate();
	
	let prev = calendarize(new Date(year, month-1), offset);
	let current = calendarize(new Date(year, month), offset);
	let next = calendarize(new Date(year, month+1), offset);
	
	function toPrev() {
		[current, next] = [prev, current];
		
		if (--month < 0) {
			month = 11;
			year--;
		}
		
		prev = calendarize(new Date(year, month-1), offset);
	}
	
	function toNext() {
		[prev, current] = [current, next];
		
		if (++month > 11) {
			month = 0;
			year++;
		}
		
		next = calendarize(new Date(year, month+1), offset);
	}
	
	function isToday(day) {
		return today && today_year === year && today_month === month && today_day === day;
	}
	
	function hndl(day){
		isAvailable(day)
			daySelected = transformDate( day );		
	}
	
	function transformDate ( iDate ){
		return addZero(iDate)+"/"+addZero(month+1)+"/"+year;
	}
	
	function ovr(e){
		console.log(e);
	}
	$: isSelectedDate = (iDate)=>{
		let day = transformDate(iDate);		
		if(daySelected == day && isAvailable(iDate)){
			$store.installationDate.date = daySelected;
			return "date-selected";
		}
		else {
			return "";
		}
	}
	function isAvailable(iDate){
		let day = transformDate(iDate);		
		for( let i in dataCalendar ){			
			if(i == day)
				return true;
		}
		return false;
	}
	function isAvailableDate(iDate){
		return isAvailable(iDate)?"date-available":"";
	}
	function addZero(n){
		return n < 10 ? '0'+n:n;
	}
</script>

<div class="header">
	
	<h4>{months[month]} {year}</h4>
	<Arrow left on:click={toPrev} />
	<Arrow on:click={toNext} />
</div>

<div class="month">
	{#each labels as txt, idx (txt)}
		<span class="label">{ labels[(idx + offset) % 7] }</span>
	{/each}

	{#each { length:6 } as w,idxw (idxw)}
		{#if current[idxw]}
			{#each { length:7 } as d,idxd (idxd)}
				{#if current[idxw][idxd] != 0}
					<span class={"date "+isAvailableDate(current[idxw][idxd])+" "+isSelectedDate(current[idxw][idxd])} 
							class:today={isToday(current[idxw][idxd])} 
								on:mouseover={()=>{ovr(this)}}
								on:click={()=>{hndl(current[idxw][idxd])}}>
						{ current[idxw][idxd] }
					</span>
				{:else if (idxw < 1)}
					<span class="date other">{ prev[prev.length - 1][idxd] }</span>
				{:else}
					<span class="date other">{ next[0][idxd] }</span>
				{/if}
			{/each}
		{/if}
	{/each}
</div>

<style>
	.header {
		display: flex;
		margin: 2rem auto;
		align-items: center;
		justify-content: left;
		user-select: none;
        width:400px;
	}
	
	h4 {
		display: block;
		text-align: center;
		text-transform: uppercase;
		font-size: 140%;
		/*margin: 0 1rem;*/
	}
	
	.month {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		text-align: center;
		grid-gap: 4px;
        width:400px;
	}
	
	.label {
		font-weight: 300;
		text-align: center;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
		opacity: 0.6;
	}
	
	.date {
		height: 50px;
		width:50px;
		font-size: 16px;
		letter-spacing: -1px;
		border: 1px solid #fff;
		border-radius:50%;
		padding-right: 4px;
		/* font-weight: 700; */
        font-weight: 600;
		padding: 0.5rem;
		display: flex;
  	    align-items: center;
		justify-content:center;
		cursor:pointer;
		color:#CBCBCB;
	}
	.date-available {
		color:#36424B;
	}
	.date-selected {
		background:#D31772;
		border: solid 1px #D31772;
		color: white;
	}

	.date:hover{
		border: 1px solid #e6e4e4;
	}
	
	.date.today {
		/* color: #5286fa;
		background: #c4d9fd;
		border-color: currentColor; */
	}
	
	.date.other {
		opacity: 0.2;
	}
</style>