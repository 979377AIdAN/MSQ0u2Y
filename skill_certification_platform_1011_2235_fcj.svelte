// 代码生成时间: 2025-10-11 22:35:50
  // 导入Svelte的组件和函数
  import { onMount, writable } from 'svelte/store';
  import { error } from '@picocss/pico';
  import { get, post, patch } from './api.js'; // 假设有一个api.js文件处理API请求

  // 定义可观察的状态变量
  const $skills = writable([]);
  const $selectedSkill = writable(null);
  const $certificationStatus = writable({});
  const $errorMessage = writable('');

  // 初始化函数，在组件挂载时执行
  function init() {
    loadSkills();
  }

  // 加载技能列表
  async function loadSkills() {
    try {
      const response = await get('/api/skills');
      $skills.set(response.data);
    } catch (error) {
      console.error('Failed to load skills:', error);
      $errorMessage.set('Failed to load skills');
    }
  }

  // 选择技能
  function selectSkill(skill) {
    $selectedSkill.set(skill);
  }

  // 提交认证请求
  async function submitCertification() {
    try {
      const response = await post('/api/certifications', { skillId: $selectedSkill.value.id });
      $certificationStatus.set(response.data);
      $errorMessage.set('');
    } catch (error) {
      console.error('Failed to submit certification:', error);
      $errorMessage.set('Failed to submit certification');
    }
  }

  // 更新认证状态
  async function updateCertificationStatus(skillId) {
    try {
      const response = await patch(`/api/certifications/${skillId}`, { status: 'certified' });
      $certificationStatus.set(response.data);
    } catch (error) {
      console.error('Failed to update certification status:', error);
      $errorMessage.set('Failed to update certification status');
    }
  }

  // 组件挂载时执行初始化函数
  onMount(init);
</script>

<!-- 组件的UI部分 -->
<div class="container">
  <h1>Skill Certification Platform</h1>
  {#if $errorMessage}
    <div class="error-message">{$errorMessage}</div>
  {/if}

  <div class="skills-list">
    {#each $skills as skill}
      <div class="skill" on:click={() => selectSkill(skill)} class:selected={$selectedSkill.value === skill}>
        {skill.name}
      </div>
    {/each}
  </div>

  <div class="certification-form">
    {#if $selectedSkill}
      <h2>Certify {$selectedSkill.value.name}</h2>
      <button on:click={submitCertification}>Submit Certification</button>
    {/if}
  </div>

  <div class="certification-status">
    {#if $certificationStatus}
      <h3>Certification Status:</h3>
      <p>Status: {$certificationStatus.status}</p>
      <button on:click={() => updateCertificationStatus($certificationStatus.skillId)}>Update Status</button>
    {/if}
  </div>
</div>