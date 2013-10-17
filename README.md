Most simple health check or monitoring tool based on http requests to your application status.

Needs a file `config.json` like the following example in the same path as `index.js`:

    {
      "interval": 300000,
      "options": {
        "host": "localhost",
        "port": 80,
        "path": "/path/to/status"
      },
      "mail": {
        "smtp": {
          "service": "Gmail",
          "auth": {
            "user": "user@gmail.com",
            "pass": "password"
          }
        },
        "options": {
          "from": "Your Server <user@gmail.com>",
          "to": "someone@example.com, anotherone@example.com",
          "subject": "yet another example subject",
          "text": "this ain't no spam"
        }
      }
    }

Install via `npm install`.
Start via `npm start`.

You should use a wrapper like [PM2](https://github.com/Unitech/pm2) or [Forever](https://github.com/nodejitsu/forever) to run this monitoring tool.
