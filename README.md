# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

# FORGOR Website

## Initial
- Clone into git repo
- Move out of root `sudo mv /root/projects/<git-folder> /var/www/`
- Ensure permissions
    ```
    sudo chown -R www-data:www-data /var/www/<git-folder>
    sudo chmod -R 755 /var/www/<git-folder>
    ``` 

## Reverse Proxy

### NGINX Setup
- Have domain
- Set A address as the VPS's IP address
- Wait 15 min
- Create an nginx config file with `sudo nano /etc/nginx/sites-available/<name>` and replace with:
    ```
    server {
        server_name <name>.xyz www.<name>.xyz;

        root /var/www/<git-folder>;
        index index.html

        location / {
            rewrite ^/([a-zA-Z0-9_-]+)$ /$1.html break;
            try_files $uri $uri.html $uri/ =404
        }
    }
    ```
- Link files with `sudo ln -s /etc/nginx/sites-available/<name> /etc/nginx/sites-enabled/`
- Validate config with `sudo nginx -t`
- Reload with `sudo systemctl reload nginx`

### HTTPS Setup
- Run this `sudo certbot --nginx -d <name>.xyz -d www.<name>.xyz`
- Check for cron job for auto reneew SSL cert with `sudo certbot renew --dry-run`

## Tasks

### To-Do
- [ ] If login clicked from landing then take to app
- [ ] Improve formatting to be more readable
- [ ] Improve each page's contents
- [ ] Add images
- [ ] Add actual links to extension and play store
- [ ] Better old school navigation?
- [ ] Fix the post data displaying on app screen
- [ ] Allow for post data to be opened individually
- [ ] Add delete button
- [ ] 

### Done
- [x] Formatted header