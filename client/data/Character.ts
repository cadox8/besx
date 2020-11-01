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

import * as Cfx from 'fivem-js';

export class Character {

    public readonly data: { internal: string, displayName: string, value: number, min: number, max: number, zoomOffset: number, camOffset: number, from?: string }[];

    public readonly defaultCharacter: { male: string, female: string};

    constructor() {
        this.data = this.loadData();

        this.defaultCharacter = { male: 'mp_m_execpa_01', female: 'mp_f_execpa_02' };
    }

    // ToDo: Change to Commons?

    // Skinchanger
    private loadData(): IData[] {
        const ped: number = Cfx.Player.prototype.Handle;
        return [
            // Skin
            { internal: 'sex', displayName: 'Sex', value: 0, min: 0, max: 1, zoomOffset: 0.6, camOffset: 0.65 },
            { internal: 'face', displayName: 'Face', value: 0, min: 0, max: 45, zoomOffset: 0.6, camOffset: 0.65 },
            { internal: 'skin', displayName: 'Skin', value: 0, min: 0, max: 45, zoomOffset: 0.6, camOffset: 0.65 },
            { internal: 'hair_1', displayName: 'Hair', value: 0, min: 0, max: GetNumberOfPedDrawableVariations(ped, 2) - 1, zoomOffset: 0.6, camOffset: 0.65 },
            { internal: 'hair_2', displayName: 'Hair 2', value: 0, min: 0, max: GetNumberOfPedTextureVariations(ped, 2, 0) - 1, zoomOffset: 0.6, camOffset: 0.65 },
            { internal: 'hair_color_1', displayName: 'Hair color', value: 0, min: 0, max: GetNumHairColors() - 1, zoomOffset: 0.6, camOffset: 0.65 },
            { internal: 'hair_color_2', displayName: 'Hair color 2', value: 0, min: 0, max: GetNumHairColors() - 1, zoomOffset: 0.6, camOffset: 0.65 },
            { internal: 'eye_color', displayName: 'Eye color', value: 0, min: 0, max: 31, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'eyebrow_1', displayName: 'Eyebrow size', value: 0, min: 0, max: GetNumHeadOverlayValues(2) - 1, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'eyebrow_2', displayName: 'Eyebrow type', value: 0, min: 0, max: 10, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'eyebrow_3', displayName: 'Eyebrow color', value: 0, min: 0, max: GetNumHairColors() - 1, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'eyebrow_4', displayName: 'Eyebrow color 2', value: 0, min: 0, max: GetNumHairColors() - 1, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'makeup_1', displayName: 'Makeup', value: 0, min: 0, max: GetNumHeadOverlayValues(4) - 1, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'makeup_2', displayName: 'Makeup Thickness', value: 0, min: 0, max: 10, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'makeup_3', displayName: 'Makeup color', value: 0, min: 0, max: GetNumHairColors() - 1, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'makeup_4', displayName: 'Makeup color 2', value: 0, min: 0, max: GetNumHairColors() - 1, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'lipstick_1', displayName: 'Lipstick Type', value: 0, min: 0, max: GetNumHeadOverlayValues(8) - 1, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'lipstick_2', displayName: 'Lipstick Thickness', value: 0, min: 0, max: 10, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'lipstick_3', displayName: 'Lipstick color', value: 0, min: 0, max: GetNumHairColors() - 1, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'lipstick_4', displayName: 'Lipstick color 2', value: 0, min: 0, max: GetNumHairColors() - 1, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'chest_1', displayName: 'Chest Hair', value: 0, min: 0, max: GetNumHeadOverlayValues(10) - 1, zoomOffset: 0.75, camOffset: 0.15 },
            { internal: 'chest_2', displayName: 'Chest Hair 2', value: 0, min: 0, max: 10, zoomOffset: 0.75, camOffset: 0.15 },
            { internal: 'chest_3', displayName: 'Chest Hair color', value: 0, min: 0, max: GetNumHairColors() - 1, zoomOffset: 0.75, camOffset: 0.15 },
            { internal: 'bodyb', displayName: 'Body builder', value: 0, min: 0, max: GetNumHeadOverlayValues(11) - 1, zoomOffset: 0.75, camOffset: 0.15 },
            { internal: 'bodyb_2', displayName: 'Body builder size', value: 0, min: 0, max: 10, zoomOffset: 0.75, camOffset: 0.15 },
            { internal: 'age_1', displayName: 'Age', value: 0, min: 0, max: GetNumHeadOverlayValues(3) - 1, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'age_2', displayName: 'Age 2', value: 0, min: 0, max: 10, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'blemishes_1', displayName: 'Blemishes', value: 0, min: 0, max: GetNumHeadOverlayValues(0) - 1, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'blemishes_2', displayName: 'Blemishes color', value: 0, min: 0, max: 10, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'blush_1', displayName: 'Blush 1', value: 0, min: 0, max: GetNumHeadOverlayValues(5) - 1, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'blush_2', displayName: 'Blush 2', value: 0, min: 0, max: 10, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'blush_3', displayName: 'Blush color', value: 0, min: 0, max: GetNumHairColors() - 1, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'complexion_1', displayName: 'Lipstick Thickness', value: 0, min: 0, max: GetNumHeadOverlayValues(6) - 1, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'complexion_2', displayName: 'Lipstick color', value: 0, min: 0, max: 10, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'sun_1', displayName: 'Lipstick color 2', value: 0, min: 0, max: GetNumHeadOverlayValues(7) - 1, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'sun_2', displayName: 'Lipstick Thickness', value: 0, min: 0, max: 10, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'moles_1', displayName: 'Lipstick color', value: 0, min: 0, max: GetNumHeadOverlayValues(9) - 1, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'moles_2', displayName: 'Lipstick color 2', value: 0, min: 0, max: 10, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'beard_1', displayName: 'Beard Type', value: 0, min: 0, max: GetNumHeadOverlayValues(1) - 1, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'beard_2', displayName: 'Beard size', value: 0, min: 0, max: 10, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'beard_3', displayName: 'Beard color', value: 0, min: 0, max: GetNumHairColors() - 1, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'beard_4', displayName: 'Beard color 2', value: 0, min: 0, max: GetNumHairColors() - 1, zoomOffset: 0.4, camOffset: 0.65 },

            // Clothes
            { internal: 'tshirt_1', displayName: 'Tshirt', value: 0, min: 0, max: GetNumberOfPedDrawableVariations(ped, 8) - 1, zoomOffset: 0.75, camOffset: 0.15 },
            { internal: 'tshirt_2', displayName: 'Tshirt color', value: 0, min: 0, max: GetNumberOfPedTextureVariations(ped, 8, 0) - 1, zoomOffset: 0.75, camOffset: 0.15, from: 'tshirt_1' },
            { internal: 'torso_1', displayName: 'Torso', value: 0, min: 0, max: GetNumberOfPedDrawableVariations(ped, 11) - 1, zoomOffset: 0.75, camOffset: 0.15 },
            { internal: 'torso_2', displayName: 'Torso color', value: 0, min: 0, max: GetNumberOfPedTextureVariations(ped, 11, 0) - 1, zoomOffset: 0.75, camOffset: 0.15, from: 'torso_1' },
            { internal: 'decals_1', displayName: 'Decals', value: 0, min: 0, max: GetNumberOfPedDrawableVariations(ped, 10) - 1, zoomOffset: 0.75, camOffset: 0.15 },
            { internal: 'decals_2', displayName: 'Decals color', value: 0, min: 0, max: GetNumberOfPedTextureVariations(ped, 10, 0) - 1, zoomOffset: 0.75, camOffset: 0.15, from: 'decals_1' },
            { internal: 'arms', displayName: 'Arms', value: 0, min: 0, max: GetNumberOfPedDrawableVariations(ped, 3) - 1, zoomOffset: 0.75, camOffset: 0.15 },
            { internal: 'arms_2', displayName: 'Arms type', value: 0, min: 0, max: 10, zoomOffset: 0.75, camOffset: 0.15, from: 'arms_1' },
            { internal: 'pants_1', displayName: 'Pants', value: 0, min: 0, max: GetNumberOfPedDrawableVariations(ped, 4) - 1, zoomOffset: 0.8, camOffset: -0.5 },
            { internal: 'pants_2', displayName: 'Pants color', value: 0, min: 0, max: GetNumberOfPedTextureVariations(ped, 4, 0) - 1, zoomOffset: 0.8, camOffset: -0.5, from: 'pants_1' },
            { internal: 'shoes_1', displayName: 'Shoes', value: 0, min: 0, max: GetNumberOfPedDrawableVariations(ped, 6) - 1, zoomOffset: 0.8, camOffset: -0.8 },
            { internal: 'shoes_2', displayName: 'Shoes color', value: 0, min: 0, max: GetNumberOfPedTextureVariations(ped, 6, 0) - 1, zoomOffset: 0.8, camOffset: -0.8, from: 'shoes_1' },
            { internal: 'bproof_1', displayName: 'Bullet Proof', value: 0, min: 0, max: GetNumberOfPedDrawableVariations(ped, 9) - 1, zoomOffset: 0.75, camOffset: 0.15 },
            { internal: 'bproof_2', displayName: 'Bullet Proof color', value: 0, min: 0, max: GetNumberOfPedTextureVariations(ped, 9, 0) - 1, zoomOffset: 0.75, camOffset: 0.15, from: 'bproof_1' },
            { internal: 'bags_1', displayName: 'Bag', value: 0, min: 0, max: GetNumberOfPedDrawableVariations(ped, 5) - 1, zoomOffset: 0.75, camOffset: 0.15 },
            { internal: 'bags_2', displayName: 'Bag color', value: 0, min: 0, max: GetNumberOfPedTextureVariations(ped, 5, 0) - 1, zoomOffset: 0.75, camOffset: 0.15, from: 'bags_1' },

            // Masks
            { internal: 'mask_1', displayName: 'Mask', value: 0, min: 0, max: GetNumberOfPedDrawableVariations(ped, 1) - 1, zoomOffset: 0.6, camOffset: 0.65 },
            { internal: 'mask_2', displayName: 'Mask color', value: 0, min: 0, max: GetNumberOfPedTextureVariations(ped, 1, 0) - 1, zoomOffset: 0.6, camOffset: 0.65, from: 'mask_1' },

            // Cosmetics
            { internal: 'chain_1', displayName: 'Chain', value: 0, min: 0, max: GetNumberOfPedDrawableVariations(ped, 7) - 1, zoomOffset: 0.6, camOffset: 0.65 },
            { internal: 'chain_2', displayName: 'Chain color', value: 0, min: 0, max: GetNumberOfPedTextureVariations(ped, 7, 0) - 1, zoomOffset: 0.6, camOffset: 0.65, from: 'chain_1' },
            { internal: 'watches_1', displayName: 'Watches', value: -1, min: -1, max: GetNumberOfPedPropDrawableVariations(ped, 6) - 1, zoomOffset: 0.75, camOffset: 0.15 },
            { internal: 'watches_2', displayName: 'Watches color', value: 0, min: 0, max: GetNumberOfPedPropTextureVariations(ped, 6, 0) - 1, zoomOffset: 0.75, camOffset: 0.15, from: 'watches_1' },
            { internal: 'bracelets_1', displayName: 'Bracelets', value: -1, min: -1, max: GetNumberOfPedPropDrawableVariations(ped, 7) - 1, zoomOffset: 0.75, camOffset: 0.15 },
            { internal: 'bracelets_2', displayName: 'Bracelets color', value: 0, min: 0, max: GetNumberOfPedPropTextureVariations(ped, 7, 0) - 1, zoomOffset: 0.75, camOffset: 0.15, from: 'bracelets_1' },

            // Extras
            { internal: 'helmet_1', displayName: 'Torso', value: -1, min: -1, max: GetNumberOfPedPropDrawableVariations(ped, 0) - 1, zoomOffset: 0.6, camOffset: 0.65 },
            { internal: 'helmet_2', displayName: 'Torso color', value: 0, min: 0, max: GetNumberOfPedPropTextureVariations(ped, 0, 0) - 1, zoomOffset: 0.6, camOffset: 0.65, from: 'torso_1' },
            { internal: 'glasses_1', displayName: 'Decals', value: 0, min: 0, max: GetNumberOfPedPropDrawableVariations(ped, 1) - 1, zoomOffset: 0.6, camOffset: 0.65 },
            { internal: 'glasses_2', displayName: 'Decals color', value: 0, min: 0, max: GetNumberOfPedPropTextureVariations(ped, 1, 0) - 1, zoomOffset: 0.6, camOffset: 0.65, from: 'decals_1' },
            { internal: 'ears_1', displayName: 'Ear accessory', value: 0, min: 0, max: GetNumberOfPedDrawableVariations(ped, 1) - 1, zoomOffset: 0.4, camOffset: 0.65 },
            { internal: 'ears_2', displayName: 'Ear accessory color', value: 0, min: 0, max: GetNumberOfPedTextureVariations(ped, 1, 0) - 1, zoomOffset: 0.4, camOffset: 0.65, from: 'ears_1' },

            // Tattoos
        ];
    }

    private find(data: IData[], search: string): number {
        return data.find(d => d.internal === search).value;
    }

    public updateCharacter(ped: number, data: IData[]): void {
        SetPedHeadBlendData(ped, this.find(data, 'face'), this.find(data, 'face'), this.find(data, 'face'), this.find(data, 'skin'), this.find(data, 'skin'), this.find(data, 'skin'), 1.0, 1.0, 1.0, true);

        SetPedHairColor(ped, this.find(data, 'hair_color_1'), this.find(data, 'hair_color_2'));
        SetPedHeadOverlay(ped, 3, this.find(data, 'age_1'), this.find(data, 'age_2') / 10);
        SetPedHeadOverlay(ped, 0, this.find(data, 'blemishes_1'), this.find(data, 'blemishes_2') / 10);
        SetPedHeadOverlay(ped, 1, this.find(data, 'beard_1'), this.find(data, 'beard_2') / 10);

        SetPedEyeColor(ped, this.find(data, 'eye_color'));
    }
}

export interface IData {
    internal: string;
    displayName: string;
    value: number;
    min: number;
    max: number;
    zoomOffset: number;
    camOffset: number;
    from?: string;
}