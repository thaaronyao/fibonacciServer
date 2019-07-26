// {maxAge:3600000} this is for 1 hour
// {maxAge:60000} this is for 1 min
const maxAge = {maxAge: 60000};

module.exports = {
    checkCookie: function(req, res, next) {
        if(!req.cookies.fib) {
            switch(req.url) {
                case '/current':
                    res.cookie('fib', '1 0', maxAge);
                    res.locals.current = 0;
                    return next();
                case '/previous':
                    return next('No previous and current values, please go to /current to start');
                case '/next': 
                    return next('No previous and current values, please go to /current to start');
            }
        } else if(req.cookies.fib) {
            let fib = req.cookies.fib.split(' ');
            switch(req.url) {
                case '/current':
                    res.locals.current = fib[1];
                    return next();
                case '/previous':
                    if(fib[1] === '0') return next('current fib number is 0, there is no previous number');
                    else res.locals.previous = fib[0];
                    return next();
                case '/next': 
                    res.locals.next = parseInt(fib[0]) + parseInt(fib[1]);
                    newCookie = [fib[1], res.locals.next].join(' ');
                    res.cookie('fib', newCookie, maxAge);
                    return next();
            }
        }       
    }
}