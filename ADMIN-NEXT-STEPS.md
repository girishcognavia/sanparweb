# SANPAR Admin — Do It Yourself Setup Guide

Follow these steps from start to finish. No need to send anything back to anyone.

After this guide, the admin at `https://sanpar.com/admin` will be fully working —
edits made there will appear on the website's `/products` page.

**Total time: ~10 minutes.**

---

## Before you start — what you need

- [ ] Your laptop (Windows 10/11 with PowerShell — built in, no install needed)
- [ ] The SSH private key for the Lightsail server (see Step 1)
- [ ] The repo cloned on your laptop (you already have it — that's where this file is)
- [ ] Admin username + password (the one that pops up when you visit `/admin`)

---

## Step 1. Get the SSH key

The key is a `.pem` file. Find it using **option A**, **B**, or **C**:

### Option A — Look on your laptop first

Open PowerShell and run:
```powershell
dir $env:USERPROFILE\.ssh
```

If you see a `.pem` file (anything ending in `.pem`), that's probably it. Note the full path.

### Option B — Download from AWS Lightsail console

1. Go to https://lightsail.aws.amazon.com/
2. Sign in
3. Click **Account** (top right) → **SSH Keys**
4. Find the key associated with the sanpar.com instance
5. Click **Download** — save it as `C:\Users\<your-name>\.ssh\sanpar.pem`

### Option C — Use the browser-based SSH instead (no key file needed)

1. Go to https://lightsail.aws.amazon.com/
2. Click the instance running sanpar.com
3. Click the orange **Connect using SSH** button
4. A terminal opens in your browser — you're already logged in as `ubuntu`
5. Skip Steps 2 and 3 below, jump straight to Step 4

---

## Step 2. Lock down the key file (Windows only — required)

Skip this step if you used Option C above.

In PowerShell, replace `<your-name>` with your Windows username and run:
```powershell
icacls C:\Users\<your-name>\.ssh\sanpar.pem /inheritance:r /grant:r "$($env:USERNAME):(R)"
```

This tells Windows "only I can read this key." Without it, SSH refuses to use the key.

You should see output like `Successfully processed 1 files`.

---

## Step 3. Upload the install files to the server

In PowerShell, in the project folder, run:
```powershell
cd D:\Cognavia\SNPNEW3
scp -i C:\Users\<your-name>\.ssh\sanpar.pem -r server ubuntu@65.0.163.178:/tmp/sanpar-cms-install
```

This copies the `server/` folder to `/tmp/sanpar-cms-install/` on the server.

When asked `Are you sure you want to continue connecting?` type **yes** and press Enter.

You should see four files transfer (api.js, sanpar-cms.service, install.sh, SETUP.md).

---

## Step 4. Connect to the server

If you used Options A or B:
```powershell
ssh -i C:\Users\<your-name>\.ssh\sanpar.pem ubuntu@65.0.163.178
```

If you used Option C: you're already connected via the browser terminal.

You should see a prompt like `ubuntu@ip-...:~$`.

---

## Step 5. Run the install script

This is the magic step — one command does the whole installation:

```bash
sudo bash /tmp/sanpar-cms-install/install.sh
```

If you used Option C (browser SSH), you'll need to first upload the script.
In that case, skip to the **"If you used browser SSH"** note at the bottom.

The script prints a colour-coded progress as it goes:
- `[OK]` green = step completed
- `[INFO]` blue = doing something
- `[WARN]` yellow = something to note (not a failure)
- `[ERROR]` red = stopped, will revert any changes

At the end, you'll see:
```
================================================================
SANPAR CMS install complete.
================================================================
```

If you see `[ERROR]` anywhere, **the script automatically reverts changes**. Copy the
error message and the website will still be working. Try running the script again
after fixing whatever it complained about.

Common things the script might say and what to do:
- `Run with sudo` — you forgot the `sudo` prefix. Try again with `sudo bash …`
- `Service failed to start` — share the journalctl output with the dev team
- `nginx -t failed. Reverting` — config syntax conflict, contact dev team

---

## Step 6. Test it works (do this in your browser)

1. Open https://sanpar.com/admin
2. Enter your admin username + password
3. On the **Water Chillers** card, click **Edit**
4. In the **Description** field, change anything — e.g., add the word "TEST" at the end
5. Click **Save** (the blue button inside the popup) — this stages the change
6. Click **Save Changes** (the green button at the top of the page)
7. You should see a green pop-up: **"Saved! 14 products published."**

Now verify the change is on the public website:

1. Open https://sanpar.com/products in a new tab
2. Press **Ctrl+Shift+R** (hard refresh)
3. Scroll to the Water Chillers card
4. Your "TEST" change should be visible

**If you see the change → the system is fully working.** 🎉

---

## Step 7. Clean up (revert your test edit)

Don't leave "TEST" on the live website! Go back to admin, edit Water Chillers again,
change the description back to:

> CFC-free process chillers from 0.5TR to 100TR. PLC-controlled with digital
> temperature display. Air-cooled and water-cooled variants. Designed for 24/7
> industrial operation.

Click Save → Save Changes. The website is back to its original state.

---

## You're done. What now?

From this point on, the admin can:

✅ Edit any of the 14 product names, descriptions, categories, images, features
✅ Mark products active/inactive
✅ See changes immediately on `/products` after refreshing
✅ Roll back any mistake (the server keeps the last 30 versions automatically)

❌ The admin cannot yet add brand-new products that appear on the website
   (the JSON saves them, but the listing page only shows the 14 existing ones)
❌ The admin cannot edit the homepage's 4 featured product cards
❌ The admin cannot edit individual product detail pages (`/product-xeros` etc.)

These are intentional safety choices. They can be added later if needed.

---

## If something goes wrong later

**The website itself cannot break** because of any admin error. It runs on hardcoded
HTML — independent of the admin/API.

If the admin Save button stops working at any point:
```bash
ssh -i C:\Users\<your-name>\.ssh\sanpar.pem ubuntu@65.0.163.178
sudo systemctl restart sanpar-cms
sudo journalctl -u sanpar-cms -n 50
```

The first command restarts the service. The second shows the last 50 log lines.

To restore a previous version of products data:
```bash
ls -lt /var/www/html/data/backups/ | head -10
sudo cp /var/www/html/data/backups/<filename> /var/www/html/data/products.json
sudo chown www-data:www-data /var/www/html/data/products.json
```

No restart needed — the next page load on `/products` will show the restored data.

---

## If you used browser-based SSH (no key file)

The browser SSH doesn't let you `scp` files directly. Instead:

1. On the server (in the browser terminal), run:
   ```bash
   sudo apt-get install -y git
   git clone https://github.com/cognavia-ai/sanpar0.git /home/ubuntu/sanpar-repo
   ```
   (You may need to enter GitHub credentials — use a personal access token, not your
   password. Ask the dev team for help if needed.)

2. Run the install script from the cloned repo:
   ```bash
   sudo bash /home/ubuntu/sanpar-repo/server/install.sh
   ```

3. Continue with Step 6 above.

---

## Summary

| Step | What you do | Time |
|------|-------------|------|
| 1 | Find SSH key file (or use browser SSH) | 2 min |
| 2 | Lock down key permissions (PowerShell) | 30 sec |
| 3 | scp the server/ folder up | 30 sec |
| 4 | ssh into the server | 30 sec |
| 5 | Run `sudo bash /tmp/sanpar-cms-install/install.sh` | 2 min |
| 6 | Test edit + verify in browser | 2 min |
| 7 | Revert test edit | 1 min |

**Total: ~10 minutes from start to finish.**
