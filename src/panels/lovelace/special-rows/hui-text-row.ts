import {
  html,
  LitElement,
  TemplateResult,
  customElement,
  property,
  css,
  CSSResult,
} from "lit-element";

import { LovelaceRow, TextConfig } from "../entity-rows/types";
import { HomeAssistant } from "../../../types";

import "../../../components/ha-icon";

@customElement("hui-text-row")
class HuiTextRow extends LitElement implements LovelaceRow {
  public hass?: HomeAssistant;

  @property() private _config?: TextConfig;

  public setConfig(config: TextConfig): void {
    if (!config || !config.name || !config.text) {
      throw new Error("Invalid Configuration: 'name' and 'url' required");
    }

    this._config = config;
  }

  protected render(): TemplateResult {
    if (!this._config) {
      return html``;
    }

    return html`
      <ha-icon .icon="${this._config.icon}"></ha-icon>
      <div class="name">${this._config.name}</div>
      <div class="text">${this._config.text}</div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      :host {
        display: flex;
        align-items: center;
      }
      ha-icon {
        padding: 8px;
        color: var(--paper-item-icon-color);
      }
      div {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .name {
        margin-left: 16px;
      }
      .text {
        text-align: right;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hui-text-row": HuiTextRow;
  }
}
