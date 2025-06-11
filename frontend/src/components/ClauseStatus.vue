<template>
    <div :class="['clause', presentClass]">
      <span class="clause-title">{{ clauseName | capitalize }}:</span>
      <span class="clause-status">{{ data.present }}</span>
      <div v-if="data.present === 'PRESENT'">
        <span class="clause-snippet">{{ data.snippet }}</span>
      </div>
      <div v-else class="clause-guidance">
        <span>⚠️ {{ guidance }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['clauseName', 'data']);
  const guidances = {
    confidentiality: "Consider adding a confidentiality clause to protect sensitive info.",
    term: "Specify how long NDA obligations last.",
    jurisdiction: "Add the governing law for this agreement.",
    remedies: "Describe remedies for breached NDA.",
    exclusions: "List exclusions to confidentiality.",
    signatures: "Ensure both parties sign the agreement."
  };
  const guidance = guidances[props.clauseName] || "Clause missing. Please review.";
  const presentClass = props.data.present === "PRESENT" ? "present" : "absent";
  </script>
  
  <script>
  export default {
    filters: {
      capitalize(value) {
        if (!value) return '';
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    }
  }
  </script>
  
  <style scoped>
  .clause { margin: 10px 0; padding: 10px; border-radius: 6px; }
  .present { background: #e0ffe0; }
  .absent { background: #ffe0e0; }
  .clause-title { font-weight: bold; }
  .clause-status { margin-left: 8px; }
  .clause-snippet { display: block; margin-top: 6px; font-style: italic; }
  .clause-guidance { color: #d35400; margin-top: 6px; }
  </style>