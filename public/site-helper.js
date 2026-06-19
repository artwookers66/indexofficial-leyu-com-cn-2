/**
 * 页面辅助功能模块
 * 用于生成提示卡片、关键词徽章和访问说明
 * 无第三方依赖
 */

(function() {
  'use strict';

  // 配置数据
  const CONFIG = {
    siteUrl: 'https://indexofficial-leyu.com.cn',
    keyword: '乐鱼体育',
    cardTitle: '欢迎访问乐鱼体育平台',
    cardDescription: '乐鱼体育是最专业的体育赛事服务平台，提供丰富的体育资讯和互动体验。',
    badgeText: '乐鱼体育',
    badgeColor: '#e74c3c',
    instructions: [
      '点击页面任意位置可关闭提示卡片',
      '使用键盘 Esc 键也可关闭提示卡片',
      '关键词徽章代表当前平台的核心标识'
    ]
  };

  /**
   * 创建提示卡片元素
   * @returns {HTMLElement} 卡片DOM元素
   */
  function createCard() {
    const card = document.createElement('div');
    card.id = 'site-helper-card';
    card.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 320px;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.18);
      padding: 24px;
      z-index: 9999;
      font-family: 'Segoe UI', system-ui, sans-serif;
      border-left: 6px solid ${CONFIG.badgeColor};
      transition: all 0.3s ease;
    `;

    // 标题
    const title = document.createElement('h3');
    title.textContent = CONFIG.cardTitle;
    title.style.cssText = 'margin: 0 0 12px 0; font-size: 18px; color: #2c3e50;';

    // 描述
    const desc = document.createElement('p');
    desc.textContent = CONFIG.cardDescription;
    desc.style.cssText = 'margin: 0 0 16px 0; font-size: 14px; color: #555; line-height: 1.5;';

    // 链接
    const link = document.createElement('a');
    link.href = CONFIG.siteUrl;
    link.textContent = CONFIG.siteUrl;
    link.target = '_blank';
    link.style.cssText = 'display: inline-block; margin-bottom: 16px; color: #2980b9; font-size: 13px; word-break: break-all;';

    // 关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
      position: absolute;
      top: 12px;
      right: 16px;
      background: none;
      border: none;
      font-size: 24px;
      color: #999;
      cursor: pointer;
      line-height: 1;
    `;
    closeBtn.addEventListener('click', function() {
      document.body.removeChild(card);
    });

    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(link);
    card.appendChild(closeBtn);

    return card;
  }

  /**
   * 创建关键词徽章
   * @returns {HTMLElement} 徽章元素
   */
  function createBadge() {
    const badge = document.createElement('span');
    badge.id = 'site-helper-badge';
    badge.textContent = CONFIG.badgeText;
    badge.style.cssText = `
      display: inline-block;
      background: ${CONFIG.badgeColor};
      color: #ffffff;
      font-size: 13px;
      font-weight: 600;
      padding: 6px 16px;
      border-radius: 20px;
      margin: 20px 0 0 0;
      cursor: default;
      font-family: 'Segoe UI', system-ui, sans-serif;
      box-shadow: 0 2px 6px rgba(231, 76, 60, 0.3);
    `;
    return badge;
  }

  /**
   * 创建访问说明列表
   * @returns {HTMLElement} 说明列表元素
   */
  function createInstructions() {
    const container = document.createElement('div');
    container.id = 'site-helper-instructions';
    container.style.cssText = 'margin-top: 16px; padding: 16px; background: #f8f9fa; border-radius: 8px;';

    const heading = document.createElement('h4');
    heading.textContent = '使用说明：';
    heading.style.cssText = 'margin: 0 0 10px 0; font-size: 15px; color: #2c3e50;';

    const list = document.createElement('ul');
    list.style.cssText = 'margin: 0; padding-left: 20px;';

    CONFIG.instructions.forEach(function(text) {
      const item = document.createElement('li');
      item.textContent = text;
      item.style.cssText = 'font-size: 13px; color: #555; margin-bottom: 6px; line-height: 1.4;';
      list.appendChild(item);
    });

    container.appendChild(heading);
    container.appendChild(list);
    return container;
  }

  /**
   * 初始化所有功能
   */
  function init() {
    // 避免重复初始化
    if (document.getElementById('site-helper-card')) return;

    const card = createCard();

    // 创建徽章并放入卡片
    const badge = createBadge();
    card.appendChild(badge);

    // 创建说明并放入卡片
    const instructions = createInstructions();
    card.appendChild(instructions);

    // 添加到页面
    document.body.appendChild(card);

    // 点击页面关闭卡片（点击卡片本身不关闭）
    document.addEventListener('click', function(e) {
      const cardEl = document.getElementById('site-helper-card');
      if (cardEl && !cardEl.contains(e.target)) {
        document.body.removeChild(cardEl);
      }
    });

    // Esc键关闭
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const cardEl = document.getElementById('site-helper-card');
        if (cardEl) {
          document.body.removeChild(cardEl);
        }
      }
    });
  }

  // 在DOM完全加载后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();