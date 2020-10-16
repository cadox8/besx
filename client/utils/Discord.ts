/*
 * Copyright (c) 2020 - cadox8
 *
 * All Rights Reserved
 *
 * That means:
 *
 * - You shall not use any piece of this software in a commercial product / service
 * - You shall not resell this software
 * - You shall not provide any facility to install this particular software in a commercial product / service
 * - If you redistribute this software, you must link to ORIGINAL repository at https://github.com/cadox8/besx
 * - This copyright should appear in every part of the project code
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

export class Discord {

    private readonly appID: number;
    private readonly logo: string;
    private readonly logoSmall: string;
    public text: string;
    public logoText: string;
    public logoTextSmall: string;

    constructor(appID: number, logo: string, logoSmall: string, logoText: string, logoTextSmall: string, text: string) {
        this.appID = appID;
        this.logo = logo;
        this.logoSmall = logoSmall;
        this.logoText = logoText;
        this.logoTextSmall = logoTextSmall;
        this.text = text;

        this.update();
    }

    private update(): void {
        setInterval(() => {
            SetDiscordAppId(String(this.appID));
            SetRichPresence(this.text);
            SetDiscordRichPresenceAsset(this.logo);
            SetDiscordRichPresenceAssetText(this.logoText);
            SetDiscordRichPresenceAssetSmall(this.logoSmall);
            SetDiscordRichPresenceAssetSmallText(this.logoTextSmall);
        }, 1000 * 60);
    }
}