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

export const client = {
    keys: {
        inventory: 289
    }
}

export const server = {
    mysql: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: ""
    },
    moderation: {
        kickBroadcast: true,
        banBroadcast: true,
        avoidRanks: false // Do not set this to true unless you want that, for example, a mod can kick an admin
    }
}

export const commons = {
    debug: true,
    updaterLog: true,
    modules: {
        money: true,
        characters: true,
        voice: true,
        phone: true,
        animations: true,
        models: true,
        police: true,
        ems: true,
        mechanic: true,
        supermarket: true
    }
}