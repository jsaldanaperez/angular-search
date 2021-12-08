import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowScrollingService {
	private styleTag: HTMLStyleElement = this.buildStyleElement();
	
	public disable = () => document.body.appendChild( this.styleTag );
	public enable = () => document.body.removeChild( this.styleTag );

	private buildStyleElement(): HTMLStyleElement {
		const style = document.createElement( "style" );
		style.textContent = `body { overflow: hidden !important; }`;
		return( style );
	}
}
