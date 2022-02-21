import { DateTime } from './node_modules/luxon/build/es6/luxon.js'
 function date() {
  const date = DateTime.now()
	const currentDate = date.toLocaleString(
		DateTime.DATETIME_FULL_WITH_SECONDS,
		(DateTime.DATETIME_FULL_WITH_SECONDS.timeZoneName = undefined),
	)
	console.log(currentDate)
}

date()